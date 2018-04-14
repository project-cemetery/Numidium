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
 *          "normalization_context"={"groups"={"lib"}},
 *          "denormalization_context"={"groups"={"lib"}}
 *      }
 * )
 *
 * @ORM\Entity
 */
class Library
{
    /**
     * @Groups({"lib"})
     *
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @Groups({"lib"})
     *
     * @ORM\Column(type="string", length=255) */
    private $title;

    /**
     * @Groups({"lib"})
     *
     * @ORM\Column(type="text")
     */
    private $description;

    /**
     * @Groups({"lib"})
     *
     * @ORM\ManyToMany(targetEntity="Book", inversedBy="libs")
     * @ORM\JoinTable(name="libs_books")
     */
    private $books;

    /**
     * @Groups({"lib"})
     *
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