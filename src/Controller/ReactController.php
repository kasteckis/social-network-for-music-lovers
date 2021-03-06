<?php

namespace App\Controller;

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
}
