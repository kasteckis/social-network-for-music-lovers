<?php

namespace App\Controller;

use App\Entity\Survey;
use App\Entity\SurveyAnswer;
use App\Entity\User;
use App\Service\SurveyService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SurveyController extends AbstractController
{
    private SurveyService $surveyService;

    /**
     * SurveyController constructor.
     * @param SurveyService $surveyService
     */
    public function __construct(SurveyService $surveyService)
    {
        $this->surveyService = $surveyService;
    }

    /**
     * @Route("/api/survey", name="get_survey", methods={"GET"})
     */
    public function getSurvey(): Response
    {
        $em = $this->getDoctrine()->getManager();
        $survey = $em->getRepository(Survey::class)->findOneBy(['active' => true]);

        if (!($survey instanceof Survey)) {
            return $this->json([
                'error' => 'Nėra aktyvaus balsavimo'
            ]);
        }

        return $this->json($this->surveyService->getFinalSurveyDataArray($survey));
    }

    /**
     * @IsGranted("ROLE_USER")
     * @Route("/api/survey", name="post_survey", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function voteOnSurvey(Request $request): Response
    {
        $em = $this->getDoctrine()->getManager();

        /** @var User $user */
        $user = $this->getUser();
        $activeSurvey = $em->getRepository(Survey::class)->findOneBy(['active' => true]);

        if (!($activeSurvey instanceof Survey)) {
            return $this->json([
                'error' => 'Nėra aktyvaus balsavimo'
            ], 404);
        }

        $data = json_decode($request->getContent());

        $surveyAnswer = $em->getRepository(SurveyAnswer::class)->find($data->surveyAnswerId);

        if (!($surveyAnswer instanceof SurveyAnswer)) {
            return $this->json([
                'error' => 'Atsakymas neegzistuoja'
            ], 404);
        }

        $surveyAnswer->addAnsweredUser($user);
        $em->flush();

        return $this->json($this->surveyService->getFinalSurveyDataArray($activeSurvey));
    }
}
