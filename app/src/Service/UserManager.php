<?php

namespace App\Service;


use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserManager
{
    private $encoder;
    private $em;

    public function __construct(
        UserPasswordEncoderInterface $encoder,
        EntityManagerInterface $em
    )
    {
        $this->encoder = $encoder;
        $this->em = $em;
    }

    public function create(string $email, string $password): User
    {
        $user = new User();

        $encodedPassword = $this->encoder->encodePassword($user, $password);

        $user
            ->setEmail($email)
            ->setPassword($encodedPassword);

        $this->em->persist($user);
        $this->em->flush();

        return $user;
    }
}