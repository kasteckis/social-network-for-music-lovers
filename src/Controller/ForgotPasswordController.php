<?php

namespace App\Controller;

use App\Service\ForgotPasswordService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ForgotPasswordController extends AbstractController
{
    private ForgotPasswordService $forgotPasswordService;

    /**
     * ForgotPasswordController constructor.
     * @param ForgotPasswordService $forgotPasswordService
     */
    public function __construct(ForgotPasswordService $forgotPasswordService)
    {
        $this->forgotPasswordService = $forgotPasswordService;
    }

    /**
     * @Route("/api/forgot-password", name="forgot_password", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function forgotPassword(Request $request): Response
    {
        $data = json_decode($request->getContent());
        $email = property_exists($data, 'email') ? $data->email : null;

        set_time_limit(2);

        if ($email) {
            $this->forgotPasswordService->sendForgotPasswordEmailIfNeeded($email);
        }

        return $this->json([
            'text' => 'El. laiškas su slaptažodžio pasikeitimo nuorodą išsiųstas, jeigu toks el. paštas yra registruotas sistemoje.'
        ]);
    }
}
