<?php


namespace App\Service;


use App\DTO\SurveyDTO;
use App\Entity\Survey;

class SurveyService
{
    public function getFinalSurveyDataArray(Survey $survey): array
    {
        $surveyDTO = new SurveyDTO($survey->getId(), $survey->getTitle());

        foreach ($survey->getSurveyAnswers() as $surveyAnswer) {
            $surveyDTO->addSurveyAnswer(
                $surveyAnswer->getId(),
                $surveyAnswer->getTitle(),
                $surveyAnswer->getAnsweredUser()->count()
            );
        }

        $surveyDTO->calculateSurveyAnswerPercentages();

        return $surveyDTO->toArray();
    }
}
