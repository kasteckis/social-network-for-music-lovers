<?php


namespace App\Service;


use App\DTO\SurveyDTO;
use App\Entity\Survey;
use App\Entity\User;

class SurveyService
{
    public function getFinalSurveyDataArray(Survey $survey, ?User $user): array
    {
        $surveyDTO = new SurveyDTO($survey->getId(), $survey->getTitle());

        foreach ($survey->getSurveyAnswers() as $surveyAnswer) {
            if ($user !== null && in_array($user, $surveyAnswer->getAnsweredUser()->toArray())) {
                $surveyDTO->setShowResults(true);
            }

            $surveyDTO->addSurveyAnswer(
                $surveyAnswer->getId(),
                $surveyAnswer->getTitle(),
                $surveyAnswer->getAnsweredUser()->count(),
                $surveyAnswer->getPosition()
            );
        }

        $surveyDTO->sortAnswersByPosition();
        $surveyDTO->calculateSurveyAnswerPercentages();

        return $surveyDTO->toArray();
    }
}
