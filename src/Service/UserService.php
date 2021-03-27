<?php

namespace App\Service;

use App\Entity\User;
use App\Repository\UserRepository;

class UserService
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getEmailUsernamePasswordFromJSON(?string $content): array
    {
        try {
            $body = json_decode($content);

            $email = $body->email;
            $username = $body->username;
            $password = $body->password;

            return [$email, $username, $password];
        }
        catch (\Exception $exception) {

            return [null, null, null];
        }
    }

    public function isEmailUnique(string $email): bool
    {
        $user = $this->userRepository->findOneBy(['email' => $email]);

        // Jeigu naudotojas rastas, tada reiskia kito naudotojo pateiktas emailas yra neunikalus
        if ($user instanceof User) {
            return false;
        }

        return true;
    }

    public function isUsernameUnique(string $username): bool
    {
        $user = $this->userRepository->findOneBy(['name' => $username]);

        // Jeigu naudotojas rastas, tada username yra neunikalus = false
        if ($user instanceof User) {
            return false;
        }

        return true;
    }

    public function getTokenExpirationDateTime(): \DateTime
    {
        $tokenExpiresAt = new \DateTime();
        $tokenExpiresAt->modify('+15 mins'); // lexik_jwt_authentication.yaml

        return $tokenExpiresAt;
    }

    public function getRoleText(array $roles): ?string
    {
        if (in_array('ROLE_ADMIN', $roles)) {
            return 'Administratorius';
        }

        return 'Naudotojas';
    }

    public function userEntityToArray(User $user): array
    {
        $tokenExpiresAt = $this->getTokenExpirationDateTime();

        return [
            'id' => $user->getId(),
            'username' => $user->getName(),
            'email' => $user->getEmail(),
            'tokenExpiresAt' => $tokenExpiresAt,
            'roles' => $user->getRoles(),
            'bio' => $user->getBio(),
            'role' => $this->getRoleText($user->getRoles()),
            'registered' => $user->getCreatedAt() instanceof \DateTimeInterface ? $user->getCreatedAt()->format('Y-m-d') : null,
            'profilePicture' => $user->getProfilePicture()
        ];
    }

    public function userEntityToSafeArray(User $user): array
    {
        return [
            'id' => $user->getId(),
            'username' => $user->getName(),
            'bio' => $user->getBio(),
            'role' => $this->getRoleText($user->getRoles()),
            'registered' => $user->getCreatedAt() instanceof \DateTimeInterface ? $user->getCreatedAt()->format('Y-m-d') : null,
            'profilePicture' => $user->getProfilePicture()
        ];
    }
}
