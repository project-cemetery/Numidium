<?php

namespace App\Entity;


use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     attributes={"access_control"="is_granted('ROLE_USER')"},
 *     collectionOperations={
 *         "get"={
 *              "normalization_context"={
 *                  "groups"={"any"}
 *              }
 *          }
 *     },
 *     itemOperations={
 *         "get"={
 *              "access_control"="is_granted('ROLE_USER') and object == user",
 *              "normalization_context"={
 *                  "groups"={"me"}
 *              }
 *          }
 *     }
 * )
 *
 * @ORM\Table(name="app_users")
 * @ORM\Entity
 */
class User implements UserInterface, \Serializable
{
    public static function createUser(
        UserPasswordEncoderInterface $encoder,
        string $email, string $password
    ): User
    {
        $user = new User();

        $user
            ->setEmail($email)
            ->setPassword($encoder->encodePassword($user, $password));

        return $user;
    }

    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     * @Assert\NotBlank
     * @Groups({"any", "me", "owner"})
     */
    private $id;

    /** @ORM\Column(type="string", length=127) */
    private $password;

    /**
     * @ORM\Column(type="string", length=127, unique=true)
     *
     * @Assert\Email
     * @Groups({"any", "me"})
     */
    private $email;

    /**
     * @ORM\Column(type="boolean")
     *
     * @Groups({"any", "me"})
     */
    private $active = false;

    /**
     * @ORM\OneToMany(
     *     targetEntity="Vacation",
     *     mappedBy="user",
     *     cascade={"persist", "remove"},
     *     orphanRemoval=true
     * )
     */
    private $vacations;

    public function __construct()
    {
        $this->vacations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->email;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): User
    {
        $this->email = $email;

        return $this;
    }

    public function getSalt(): ?string
    {
        return null;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): User
    {
        $this->password = $password;

        return $this;
    }

    public function isActive(): bool
    {
        return $this->active;
    }

    public function setActive(bool $flag): User
    {
        $this->active = $flag;

        return $this;
    }

    public function getVacations(): Collection
    {
        return $this->vacations;
    }

    public function addVacation(Vacation $vacation): User
    {
        $this->vacations->add($vacation);
        $vacation->setUser($this);

        return $this;
    }

    public function removeVacation(Vacation $vacation): User
    {
        $this->vacations->removeElement($vacation);
        $vacation->setUser(null);

        return $this;
    }

    public function getRoles(): array
    {
        return [
            'ROLE_USER',
        ];
    }

    public function eraseCredentials(): void
    {

    }

    /** @see \Serializable::serialize() */
    public function serialize(): string
    {
        return serialize([
            $this->id,
            $this->email,
            $this->password,
        ]);
    }

    /** @see \Serializable::unserialize() */
    public function unserialize($serialized): void
    {
        list (
            $this->id,
            $this->email,
            $this->password,
            ) = unserialize($serialized);
    }
}