<?php

namespace App\Entity;

use App\Repository\TOP40Repository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TOP40Repository::class)
 */
class TOP40
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="boolean")
     */
    private $new = true;

    /**
     * @ORM\Column(type="integer")
     */
    private $weeksInTop = 0;

    /**
     * @ORM\Column(type="integer")
     */
    private $likes = 0;

    /**
     * @ORM\Column(type="integer")
     */
    private $lastWeekPlace = -1;

    /**
     * @ORM\Column(type="boolean")
     */
    private $active = false;

    /**
     * @ORM\Column(type="integer")
     */
    private $place = -1;

    /**
     * @ORM\Column(type="boolean")
     */
    private $displayPlaceChange = false;

    /**
     * @ORM\OneToOne(targetEntity=Song::class, inversedBy="top40", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $song;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNew(): ?bool
    {
        return $this->new;
    }

    public function setNew(bool $new): self
    {
        $this->new = $new;

        return $this;
    }

    public function getWeeksInTop(): ?int
    {
        return $this->weeksInTop;
    }

    public function setWeeksInTop(int $weeksInTop): self
    {
        $this->weeksInTop = $weeksInTop;

        return $this;
    }

    public function getLikes(): ?int
    {
        return $this->likes;
    }

    public function setLikes(int $likes): self
    {
        $this->likes = $likes;

        return $this;
    }

    public function getLastWeekPlace(): ?int
    {
        return $this->lastWeekPlace;
    }

    public function setLastWeekPlace(int $lastWeekPlace): self
    {
        $this->lastWeekPlace = $lastWeekPlace;

        return $this;
    }

    public function getActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(bool $active): self
    {
        $this->active = $active;

        return $this;
    }

    public function getPlace(): ?int
    {
        return $this->place;
    }

    public function setPlace(int $place): self
    {
        $this->place = $place;

        return $this;
    }

    public function getDisplayPlaceChange(): ?bool
    {
        return $this->displayPlaceChange;
    }

    public function setDisplayPlaceChange(bool $displayPlaceChange): self
    {
        $this->displayPlaceChange = $displayPlaceChange;

        return $this;
    }

    public function getSong(): ?Song
    {
        return $this->song;
    }

    public function setSong(Song $song): self
    {
        $this->song = $song;

        return $this;
    }
}
