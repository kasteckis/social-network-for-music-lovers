<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ReactController extends AbstractController
{
    /**
     * @Route("/{slug<.*>}", name="react", priority="-2")
     */
    public function index(): Response
    {
        return $this->render('react/index.html.twig', []);
    }

    // TODO VELIAU NUTRINT

    /**
     * @IsGranted("ROLE_ADMIN")
     * @Route("/api/test", name="test")
     */
    public function test(): Response
    {
        $a = $this->getUser();
        $b = null;
        return $this->json(['labas' => 'sensitive data']);
    }
}
