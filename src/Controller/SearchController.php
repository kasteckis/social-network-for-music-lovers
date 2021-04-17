<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SearchController extends AbstractController
{
    /**
     * @Route("/api/search", name="api_search_get", methods={"GET"})
     */
    public function searchGet(Request $request): Response
    {
        return $this->json($request->get('search'));
    }
}
