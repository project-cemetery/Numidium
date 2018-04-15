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
class Book
{
    /**
     * @Groups({"lib"})
     *
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /** @ORM\ManyToMany(targetEntity="Library", mappedBy="books") */
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
     * @ORM\Column(type="boolean")
     */
    private $paper = false;

    /**
     * @Groups({"lib"})
     *
     * @ORM\Column(type="string", length=511)
     */
    private $shopLink;

    /**
     * @Groups({"lib"})
     *
     * @ORM\Column(type="string", length=511)
     */
    private $externalFileLink;

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
        $lib->addBook($this);

        return $this;
    }

    public function removeLib(Library $lib): Book
    {
        $this->libs->removeElement($lib);
        $lib->removeBook($this);

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

    public function getShopLink(): ?string
    {
        return $this->shopLink;
    }

    public function setShopLink(string $shopLink): Book
    {
        $this->shopLink = $shopLink;

        return $this;
    }

    public function getExternalFileLink(): ?string
    {
        return $this->externalFileLink;
    }

    public function setExternalFileLink(string $externalFileLink): Book
    {
        $this->externalFileLink = $externalFileLink;

        return $this;
    }
}
