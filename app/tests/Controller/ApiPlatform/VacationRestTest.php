<?php

namespace App\Tests\Controller\ApiPlatform;


use App\DataFixtures\UserFixtures;
use App\DataFixtures\VacationFixtures;
use App\Tests\FunctionalTestCase;

class VacationRestTest extends FunctionalTestCase
{
    public function testGetList()
    {
        $this->addFixture(UserFixtures::class);
        $this->addFixture(VacationFixtures::class);
        $this->executeFixtures();

        $client = static::createClient([], [
            'PHP_AUTH_USER' => 'user@example.com',
            'PHP_AUTH_PW'   => 'pass_1234',
        ]);

        $client->request('GET', '/api/vacations');

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    public function testGet()
    {
        $this->addFixture(UserFixtures::class);
        $this->addFixture(VacationFixtures::class);
        $this->executeFixtures();

        $client = static::createClient([], [
            'PHP_AUTH_USER' => 'user@example.com',
            'PHP_AUTH_PW'   => 'pass_1234',
        ]);

        $client->request('GET', '/api/vacations/1');
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }
}