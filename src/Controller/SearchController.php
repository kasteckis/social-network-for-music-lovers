<?php

namespace App\Controller;

use App\Service\SearchService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SearchController extends AbstractController
{
    private SearchService $searchService;

    /**
     * SearchController constructor.
     * @param SearchService $searchService
     */
    public function __construct(SearchService $searchService)
    {
        $this->searchService = $searchService;
    }

    /**
     * @Route("/api/search", name="api_search_get", methods={"GET"})
     */
    public function searchGet(Request $request): Response
    {
        /** @var ?string $keyword */
        $keyword = $request->get('search');

        if (is_null($keyword)) {
            return $this->json([
                'error' => 'Įveskite paieškos tekstą',
                'success' => false
            ]);
        }

        return $this->json(
            $this->searchService->searchByKeyword($keyword)
        );
    }
}
