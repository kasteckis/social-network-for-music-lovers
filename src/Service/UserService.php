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
}
