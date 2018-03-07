<?php

namespace App\DataFixtures;


use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    const DEFAULT_USER = 'default-user';

    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $user = User::createUser(
            $this->encoder,
            'user@example.com',
            'pass_1234'
        );

        $manager->persist($user);
        $manager->flush();

        $this->addReference(self::DEFAULT_USER, $user);
    }
}