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
class Library
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /** @ORM\Column(type="string", length=255) */
    private $title;

    /** @ORM\Column(type="text") */
    private $description;

    /**
     * @ORM\ManyToMany(targetEntity="Book", inversedBy="libs")
     * @ORM\JoinTable(name="libs_books")
     */
    private $books;

    /**
     * @ORM\ManyToMany(targetEntity="Article", inversedBy="libs")
     * @ORM\JoinTable(name="libs_articles")
     */
    private $articles;

    public function __construct()
    {
        $this->books = new ArrayCollection();
        $this->articles = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): Library
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): Library
    {
        $this->description = $description;

        return $this;
    }

    public function getBooks(): Collection
    {
        return $this->books;
    }

    public function addBook(Book $book): Library
    {
        $this->books->add($book);
        $book->addLib($this);

        return $this;
    }

    public function removeBook(Book $book): Library
    {
        $this->books->removeElement($book);
        $book->removeLib($this);

        return $this;
    }

    public function getArticles(): Collection
    {
        return $this->articles;
    }

    public function addArticle(Article $article): Library
    {
        $this->articles->add($article);
        $article->addLib($this);

        return $this;
    }

    public function removeArticle(Article $article): Library
    {
        $this->articles->removeElement($article);
        $article->removeLib($this);

        return $this;
    }
}