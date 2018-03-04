<?php

namespace App\Entity;


use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *      attributes={
 *          "access_control"="is_granted('ROLE_USER')",
 *          "normalization_context"={"groups"={"owner"}},
 *          "denormalization_context"={"groups"={"owner"}}
 *      }
 * )
 * @ApiFilter(DateFilter::class, properties={"end"})
 *
 * @ORM\Entity
 */
class Vacation
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     * @Groups({"owner"})
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     *
     * @Groups({"owner"})
     */
    private $start;

    /**
     * @ORM\Column(type="date")
     *
     * @Groups({"owner"})
     */
    private $end;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="vacations")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     *
     * @Groups({"owner"})
     */
    private $user;

    public function __construct()
    {
        $this->start = new \DateTime();
        $this->end = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStart(): \DateTime
    {
        return $this->start;
    }

    public function setStart(\DateTime $start): Vacation
    {
        $this->start = $start;

        return $this;
    }

    public function getEnd(): \DateTime
    {
        return $this->end;
    }

    public function setEnd(\DateTime $end): Vacation
    {
        $this->end = $end;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): Vacation
    {
        $this->user = $user;

        return $this;
    }
}