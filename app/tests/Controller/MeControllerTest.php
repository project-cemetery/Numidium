<?php

namespace App\Tests\Controller;


use App\DataFixtures\UserFixtures;
use App\Tests\FunctionalTestCase;

class MeControllerTest extends FunctionalTestCase
{
    public function testGetIdUnauthorized()
    {
        $client = static::createClient();

        $client->request('GET', '/api/me');

        $this->assertEquals(401, $client->getResponse()->getStatusCode());
    }

    public function testGetIdAuthorized()
    {
        $this->addFixture(UserFixtures::class);
        $this->executeFixtures();

        $client = static::createClient([], [
            'PHP_AUTH_USER' => 'user@example.com',
            'PHP_AUTH_PW'   => 'pass_1234',
        ]);

        $client->request('GET', '/api/me');

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertEquals(1, $client->getResponse()->getContent());
    }
}