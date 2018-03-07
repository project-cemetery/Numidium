<?php

namespace App\DataFixtures;


use App\Entity\User;
use App\Entity\Vacation;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class VacationFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $vacation = (new Vacation())
            ->setStart(new \DateTime('2017-08-07'))
            ->setEnd(new \DateTime('2017-10-07'));

        /** @var User $user */
        $user = $this->getReference(UserFixtures::DEFAULT_USER);
        $user->addVacation($vacation);

        $manager->persist($vacation);
        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            UserFixtures::class,
        ];
    }
}