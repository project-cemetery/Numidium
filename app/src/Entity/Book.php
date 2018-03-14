<?php

namespace App\Entity;


use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;

/**
 * @ApiResource(
 *      attributes={
 *          "access_control"="is_granted('ROLE_USER')",
 *      }
 * )
 *
 * @ORM\Entity
 */
class Book
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /** @ORM\ManyToMany(targetEntity="Library", mappedBy="books") */
    private $libs;

    /** @ORM\Column(type="string", length=255) */
    private $title;

    /** @ORM\Column(type="string", length=255) */
    private $author;

    /** @ORM\Column(type="smallint") */
    private $year;

    /** @ORM\Column(type="text") */
    private $description;

    /** @ORM\Column(type="boolean") */
    private $paper = false;

    public function __construct()
    {
        $this->libs = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLibs(): Collection
    {
        return $this->libs;
    }

    public function addLib(Library $lib): Book
    {
        $this->libs->add($lib);

        return $this;
    }

    public function removeLib(Library $lib): Book
    {
        $this->libs->removeElement($lib);

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): Book
    {
        $this->title = $title;

        return $this;
    }

    public function getAuthor(): ?string
    {
        return $this->author;
    }

    public function setAuthor(string $author): Book
    {
        $this->author = $author;

        return $this;
    }

    public function getYear(): ?int
    {
        return $this->year;
    }

    public function setYear(int $year): Book
    {
        $this->year = $year;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): Book
    {
        $this->description = $description;

        return $this;
    }

    public function getPaper(): bool
    {
        return $this->paper;
    }

    public function setPaper(bool $paper): Book
    {
        $this->paper = $paper;

        return $this;
    }
}