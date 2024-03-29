<?php

namespace App\Controller;

use App\Entity\EmailConfirmation;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\EmailService;
use App\Service\UserService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserController extends AbstractController
{
    private UserService $userService;
    private EmailService $emailService;

    public function __construct(UserService $userService, EmailService $emailService)
    {
        $this->userService = $userService;
        $this->emailService = $emailService;
    }

    /**
     * @Route("/api/user", name="api_user_data")
     * @param Request $request
     * @return Response
     */
    public function getUserData(Request $request): Response
    {
        /** @var User|null $user */
        $user = $this->getUser();

        if ($user instanceof User) {
            $user->setLastLogin(new \DateTime());
            $user->setIp($request->getClientIp());
            $this->getDoctrine()->getManager()->flush();

            return $this->json($this->userService->userEntityToArray($user));
        }

        return $this->json([
            'error' => 'User is not connected!'
        ], 401);
    }

    /**
     * @Route("/api/users", name="api_get_users", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function getAllUsers(Request $request): Response
    {
        $data = json_decode($request->getContent());
        $page = property_exists($data, 'page') ? $data->page : 1;
        $filterText = property_exists($data, 'filterText') ? $data->filterText : null;
        if (strlen($filterText) === 0) {
            $filterText = null;
        }

        /** @var UserRepository $userRepo */
        $userRepo = $this->getDoctrine()->getRepository(User::class);

        $users = $userRepo->getUserListByFilterAndOffset($filterText, ($page-1)*10); // Jeigu 1 puslapis tai (1-1)*10=0 <- offset
        $userCount = $userRepo->getUserListCountyByFilterText($filterText);

        $usersArray = [];

        foreach ($users as $user) {
            $usersArray[] = $this->userService->userEntityToSafeArray($user);
        }

        return $this->json([
            'users' => $usersArray,
            'usersCount' => $userCount
        ]);
    }

    /**
     *
     * @Route("/api/user/{name}", name="api_other_user_data", methods={"GET"})
     * @param string $name
     * @return Response
     */
    public function getOtherUserData(string $name): Response
    {
        $em = $this->getDoctrine()->getManager();

        $user = $em->getRepository(User::class)->findOneBy([
            'name' => $name
        ]);

        if ($user instanceof User) {
            return $this->json($this->userService->userEntityToSafeArray($user));
        }

        return $this->json([
            'error' => 'Naudotojas nerastas'
        ], 404);
    }

    /**
     * @Route("/api/register", name="api_register_user")
     * @param Request $request
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @return Response
     */
    public function registerUser(Request $request, UserPasswordEncoderInterface $passwordEncoder): Response
    {
        [$email, $username, $password] = $this->userService->getEmailUsernamePasswordFromJSON($request->getContent());

        if (!($email && $username && $password)) {
            return $this->json([
                'error' => 'Blogi duomenys!'
            ], 400);
        }

        if (!$this->userService->isEmailUnique($email)) {
            return $this->json([
                'error' => 'Email jau yra naudojamas!'
            ], 409);
        }

        if (!$this->userService->isUsernameUnique($username)) {
            return $this->json([
                'error' => 'Slapyvardis jau yra naudojamas!'
            ], 409);
        }

        $entityManager = $this->getDoctrine()->getManager();
        $user = new User();
        $user
            ->setRegistrationIp($request->getClientIp())
            ->setIp($request->getClientIp())
            ->setEmail($email)
            ->setName($username)
            ->setPassword(
                $passwordEncoder->encodePassword($user, $password)
            );

        $entityManager->persist($user);
        $entityManager->flush();

        $hostUrl = $this->get('router')->getContext()->getScheme() . '://' . $this->get('router')->getContext()->getHost();

        $this->emailService->sendEmailConfirmationEmail($user, $user->getEmail(), $hostUrl);

        $tokenExpiresAt = $this->userService->getTokenExpirationDateTime();

        return $this->json([
            'id' => $user->getId(),
            'username' => $user->getUsername(),
            'email' => $user->getEmail(),
            'tokenExpiresAt' => $tokenExpiresAt,
            'roles' => $user->getRoles()
        ], 201);
    }

    /**
     * @IsGranted("ROLE_USER")
     * @Route("/api/user/profile-picture", name="upload_profile_picture", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function uploadProfilePicture(Request $request): Response
    {
        $photo = $request->getContent();
        /** @var User $user */
        $user = $this->getUser();
        $photoName = time() . $user->getName() . '.png';

        file_put_contents('./images/profile/' . $photoName, $photo);

        $user->setProfilePicture($photoName);
        $this->getDoctrine()->getManager()->flush();

        return $this->json($this->userService->userEntityToArray($user));
    }

    /**
     * @IsGranted("ROLE_USER")
     * @Route("/api/user/username", name="change_user_username_post", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function changeUserUsername(Request $request): Response
    {
        $data = json_decode($request->getContent());
        $newUsername = $data->username;

        /** @var User|null $user */
        $user = $this->getUser();

        if ($user instanceof User) {
            $em = $this->getDoctrine()->getManager();

            $userWithTakenNewUsername = $em->getRepository(User::class)->findOneBy([
                'name' => $newUsername
            ]);

            if ($userWithTakenNewUsername instanceof User) {
                return $this->json([
                    'error' => 'Slapyvardis užimtas'
                ]);
            }

            $user->setName($newUsername);

            $em->flush();
        }

        return $this->json($this->userService->userEntityToArray($user));
    }

    /**
     * @IsGranted("ROLE_USER")
     * @Route("/api/user/email", name="change_user_email_post", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function changeUserEmail(Request $request): Response
    {
        $data = json_decode($request->getContent());
        $newEmail = $data->email;

        /** @var User|null $user */
        $user = $this->getUser();

        if ($user instanceof User) {
            $oldEmail = $user->getEmail();
            $em = $this->getDoctrine()->getManager();

            $userWithTakenNewEmail = $em->getRepository(User::class)->findOneBy([
                'email' => $newEmail
            ]);

            if ($userWithTakenNewEmail instanceof User) {
                return $this->json([
                    'error' => 'El. paštas užimtas'
                ]);
            }

            $user->setEmail($newEmail);
            $user->setEmailConfirmed(false);

            $em->flush();

            $hostUrl = $this->get('router')->getContext()->getScheme() . '://' . $this->get('router')->getContext()->getHost();

            $this->emailService->sendEmailConfirmationEmail($user, $newEmail, $hostUrl);
            $this->emailService->sendYourEmailWasChanged($user, $oldEmail, $request->getClientIp());
        }

        return $this->json($this->userService->userEntityToArray($user));
    }

    /**
     * @IsGranted("ROLE_USER")
     * @Route("/api/user/change-password", name="change_user_password_post", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function changeUserPassword(Request $request): Response
    {
        $data = json_decode($request->getContent());
        $oldPassword = $data->oldPassword;
        $newPassword = $data->newPassword;

        /** @var User|null $user */
        $user = $this->getUser();

        if ($user instanceof User) {
            $em = $this->getDoctrine()->getManager();

            if (!password_verify($oldPassword, $user->getPassword())) {
                return $this->json([
                    'error' => 'Nurodytas blogas senas slaptažodis',
                    'success' => false
                ]);
            }

            $user->setPassword(password_hash($newPassword, PASSWORD_ARGON2ID));

            $em->flush();

            return $this->json([
                'success' => true
            ]);
        }

        return $this->json([
            'error' => 'Nenumatyta klaida',
            'success' => false
        ]);
    }

    /**
     * @IsGranted("ROLE_USER")
     * @Route("/api/user/resend-email-confirmation", name="resent_email_confirmation_post", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function resendEmailConfirmation(Request $request): Response
    {
        /** @var User $user */
        $user = $this->getUser();

        if ($user->getEmailConfirmed()) {
            return $this->json([
                'success' => false,
                'error' => 'El. pastas jau patvirtintas'
            ]);
        }

        $hostUrl = $this->get('router')->getContext()->getScheme() . '://' . $this->get('router')->getContext()->getHost();

        $this->emailService->sendEmailConfirmationEmail($user, $user->getEmail(), $hostUrl);

        return $this->json([
            'success' => true
        ]);
    }

    /**
     * @Route("/aktyvuoti/{hash}", name="activate_email_endpoint")
     * @param string $hash
     * @return Response
     */
    public function activateEmail(string $hash): Response
    {
        $em = $this->getDoctrine()->getManager();

        $emailConfirmation = $em->getRepository(EmailConfirmation::class)->findOneBy([
            'hash' => $hash,
            'confirmed' => false
        ]);

        if ($emailConfirmation instanceof EmailConfirmation) {
            $emailConfirmation->setConfirmed(true);

            $emailConfirmation->getUser()->setEmailConfirmed(true);

            $em->flush();
        }

        $hostUrl = $this->get('router')->getContext()->getScheme() . '://' . $this->get('router')->getContext()->getHost();

        return $this->redirect($hostUrl . '/profilis');
    }
}
