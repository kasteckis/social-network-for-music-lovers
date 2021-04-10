<?php

namespace App\Entity;

use App\Repository\TOP40LiveRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TOP40LiveRepository::class)
 */
class TOP40Live
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity=Song::class, cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $song;

    /**
     * @ORM\Column(type="integer")
     */
    private $likes = 0;

    /**
     * @ORM\Column(type="boolean")
     */
    private $new = false;

    /**
     * @ORM\Column(type="integer")
     */
    private $weeksInTop = 0;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getLikes(): ?int
    {
        return $this->likes;
    }

    public function setLikes(int $likes): self
    {
        $this->likes = $likes;

        return $this;
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
}
