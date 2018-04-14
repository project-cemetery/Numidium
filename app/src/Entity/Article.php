<?php

namespace App\Entity;


use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *      attributes={
 *          "access_control"="is_granted('ROLE_USER')",
 *      }
 * )
 *
 * @ORM\Entity
 */
class Article
{
    /**
     * @Groups({"lib"})
     *
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /** @ORM\ManyToMany(targetEntity="Library", mappedBy="articles") */
    private $libs;

    /**
     * @Groups({"lib"})
     *
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @Groups({"lib"})
     *
     * @ORM\Column(type="string", length=255)
     */
    private $author;

    /**
     * @Groups({"lib"})
     *
     * @ORM\Column(type="smallint")
     */
    private $year;

    /**
     * @Groups({"lib"})
     *
     * @ORM\Column(type="text")
     */
    private $description;

    /**
     * @Groups({"lib"})
     *
     * @ORM\Column(type="string", length=511)
     */
    private $link;

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

    public function addLib(Library $lib): Article
    {
        $this->libs->add($lib);

        return $this;
    }

    public function removeLib(Library $lib): Article
    {
        $this->libs->removeElement($lib);

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): Article
    {
        $this->title = $title;

        return $this;
    }

    public function getAuthor(): ?string
    {
        return $this->author;
    }

    public function setAuthor(string $author): Article
    {
        $this->author = $author;

        return $this;
    }

    public function getYear(): ?int
    {
        return $this->year;
    }

    public function setYear(int $year): Article
    {
        $this->year = $year;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): Article
    {
        $this->description = $description;

        return $this;
    }

    public function getLink(): string
    {
        return $this->link;
    }

    public function setLink(string $link): Article
    {
        $this->link = $link;

        return $this;
    }
}