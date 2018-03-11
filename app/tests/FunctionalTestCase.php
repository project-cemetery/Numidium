<?php

namespace App\Tests;


use App\DataFixtures\UserFixtures;
use App\DataFixtures\VacationFixtures;
use Doctrine\Common\DataFixtures\Executor\ORMExecutor;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\DataFixtures\Purger\ORMPurger;
use Symfony\Bridge\Doctrine\DataFixtures\ContainerAwareLoader;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Input\StringInput;
use Symfony\Component\DependencyInjection\ContainerInterface;

abstract class FunctionalTestCase extends WebTestCase
{
    private const FIXTURES = [
        UserFixtures::class     => 'test.App\DataFixtures\UserFixtures',
        VacationFixtures::class => 'test.App\DataFixtures\VacationFixtures',
    ];

    /** @var \Doctrine\ORM\EntityManager */
    private $em;

    /** @var ORMExecutor */
    private $fixtureExecutor;

    /** @var ContainerAwareLoader */
    private $fixtureLoader;

    /** @var ContainerInterface */
    private $container;

    protected function addFixture(string $fixtureClass)
    {
        /** @var FixtureInterface $fixture */
        $fixture = $this->container->get(self::FIXTURES[$fixtureClass]);

        $this->getFixtureLoader()->addFixture($fixture);
    }

    protected function executeFixtures()
    {
        $this->getFixtureExecutor()->execute($this->getFixtureLoader()->getFixtures());
    }

    protected function setUp()
    {
        $kernel = self::bootKernel();

        $this->container = $kernel->getContainer();

        $this->em = $this->container
            ->get('doctrine')
            ->getManager();

        $application = new Application($kernel);
        $application->setAutoExit(false);

        $application->run(new StringInput('doctrine:database:create'));
        $application->run(new StringInput('doctrine:schema:update --force'));
    }

    protected function tearDown()
    {
        $dbName = array_reverse(explode('/', $_ENV['DATABASE_URL']))[0];

        $this->em->getConnection()->prepare("DROP DATABASE " . $dbName . ";")->execute();

        parent::tearDown();

        $this->em->close();
        $this->em = null; // avoid memory leaks
    }

    private function getFixtureExecutor(): ORMExecutor
    {
        if (!$this->fixtureExecutor) {
            $this->fixtureExecutor = new ORMExecutor(
                $this->em,
                new ORMPurger($this->em)
            );
        }
        return $this->fixtureExecutor;
    }

    private function getFixtureLoader(): ContainerAwareLoader
    {
        if (!$this->fixtureLoader) {
            $this->fixtureLoader = new ContainerAwareLoader($this->container);
        }
        return $this->fixtureLoader;
    }
}