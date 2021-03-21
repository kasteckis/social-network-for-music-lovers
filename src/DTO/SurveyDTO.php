<?php

namespace App\DTO;

class SurveyDTO
{
    private int $id = -1;

    private ?string $title = null;

    private array $answers = [];

    private int $answeredTotal = 0;

    /**
     * SurveyDTO constructor.
     * @param int $id
     * @param string|null $title
     */
    public function __construct(int $id, ?string $title)
    {
        $this->id = $id;
        $this->title = $title;
    }

    public function addSurveyAnswer(int $id, ?string $title, int $answered): void
    {
        $this->answeredTotal += $answered;

        $this->answers[] = [
            'id' => $id,
            'title' => $title,
            'answered' => $answered,
            'percentage' => 0
        ];
    }

    public function calculateSurveyAnswerPercentages(): void
    {
        foreach ($this->answers as $key => $answer) {
            if ($this->answeredTotal === 0) {
                $this->answers[$key]['percentage'] = 0;
            } else {
                $this->answers[$key]['percentage'] = $answer['answered'] * 100 / $this->answeredTotal;
            }
        }
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'answeredTotal' => $this->answeredTotal,
            'answers' => $this->answers
        ];
    }
}
