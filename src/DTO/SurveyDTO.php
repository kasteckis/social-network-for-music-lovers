<?php

namespace App\DTO;

class SurveyDTO
{
    private int $id = -1;

    private ?string $title = null;

    private $showResults = false; // Ar rodyti atsakymus per UI (true) ar dar leisti balsuoti (false)

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

    public function addSurveyAnswer(int $id, ?string $title, int $answered, ?int $position): void
    {
        $this->answeredTotal += $answered;

        $this->answers[] = [
            'id' => $id,
            'title' => $title,
            'answered' => $answered,
            'percentage' => 0,
            'position' => $position
        ];
    }

    public function sortAnswersByPosition(): void
    {
        usort($this->answers, function ($a, $b) {
            if ($a['position'] == $b['position']) {
                return 0;
            }
            return ($a['position'] < $b['position']) ? -1 : 1;
        });
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

    public function isShowResults(): bool
    {
        return $this->showResults;
    }

    public function setShowResults(bool $showResults): void
    {
        $this->showResults = $showResults;
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'answeredTotal' => $this->answeredTotal,
            'showResults' => $this->showResults,
            'answers' => $this->answers
        ];
    }
}
