<?php

namespace App\Controller;

use App\DTO\SurveyDTO;
use App\Entity\Survey;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SurveyController extends AbstractController
{
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

        $surveyDTO = new SurveyDTO($survey->getId(), $survey->getTitle());

        foreach ($survey->getSurveyAnswers() as $surveyAnswer) {
            $surveyDTO->addSurveyAnswer(
                $surveyAnswer->getId(),
                $surveyAnswer->getTitle(),
                $surveyAnswer->getAnsweredUser()->count()
            );
        }

        $surveyDTO->calculateSurveyAnswerPercentages();

        return $this->json($surveyDTO->toArray());
    }
}
