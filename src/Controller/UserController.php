<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
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

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
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
     * @Route("/api/users/{page}", name="api_get_users")
     * @param int $page
     * @return Response
     */
    public function getAllUsers(int $page): Response
    {
        /** @var UserRepository $userRepo */
        $userRepo = $this->getDoctrine()->getRepository(User::class);

        $users = $userRepo->findBy([
            'active' => true
        ], [], 10, ($page-1)*10);

        $usersArray = [];

        foreach ($users as $user) {
            $usersArray[] = $this->userService->userEntityToSafeArray($user);
        }

        return $this->json([
            'users' => $usersArray,
            'usersCount' => count($userRepo->findBy(['active' => true]))
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
}
