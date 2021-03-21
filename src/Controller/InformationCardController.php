<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class InformationCardController extends AbstractController
{
    /**
     * @Route("/api/information", name="information_card", methods={"GET"})
     */
    public function getInformation(): Response
    {
        $em = $this->getDoctrine()->getManager();
        /** @var UserRepository $userRepo */
        $userRepo = $em->getRepository(User::class);

        $userRecentlyLoggedInCount = $userRepo->getRecentlyLoggedInUserCount();
        $registeredUsersCount = $userRepo->count([]);
        $lastRegisteredUser = $userRepo->findOneBy([], ['createdAt' => 'DESC']);

        return $this->json([
            'loggedIn' => $userRecentlyLoggedInCount,
            'registered' => $registeredUsersCount,
            'lastRegisteredUser' => [
                'id' => $lastRegisteredUser->getId(),
                'username' => $lastRegisteredUser->getName()
            ]
        ]);
    }
}
