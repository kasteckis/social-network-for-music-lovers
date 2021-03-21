<?php

namespace App\Entity;

use App\Repository\SurveyAnswerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=SurveyAnswerRepository::class)
 */
class SurveyAnswer
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\ManyToOne(targetEntity=Survey::class, inversedBy="surveyAnswers")
     * @ORM\JoinColumn(nullable=false)
     */
    private $survey;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="surveyAnswers")
     */
    private $answeredUser;

    public function __construct()
    {
        $this->answeredUser = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getSurvey(): ?Survey
    {
        return $this->survey;
    }

    public function setSurvey(?Survey $survey): self
    {
        $this->survey = $survey;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getAnsweredUser(): Collection
    {
        return $this->answeredUser;
    }

    public function addAnsweredUser(User $answeredUser): self
    {
        if (!$this->answeredUser->contains($answeredUser)) {
            $this->answeredUser[] = $answeredUser;
        }

        return $this;
    }

    public function removeAnsweredUser(User $answeredUser): self
    {
        $this->answeredUser->removeElement($answeredUser);

        return $this;
    }

    public function __toString()
    {
        return $this->title;
    }
}
