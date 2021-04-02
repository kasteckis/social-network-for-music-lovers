<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ForgotPasswordController extends AbstractController
{
    /**
     * @Route("/api/forgot-password", name="forgot_password", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function forgotPassword(Request $request): Response
    {
        return $this->json([
            'text' => 'El. laiškas su slaptažodžio pasikeitimo nuorodą išsiųstas, jeigu toks el. paštas yra registruotas sistemoje.'
        ]);
    }
}
