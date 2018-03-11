<?php

namespace App\Tests\Controller;


use App\DataFixtures\UserFixtures;
use App\Tests\FunctionalTestCase;

class FrontControllerTest extends FunctionalTestCase
{
    public function testIndexUnauthorized()
    {
        $client = static::createClient();

        $client->request('GET', '/');

        $this->assertEquals(401, $client->getResponse()->getStatusCode());
    }

    public function testIndexAuthorized()
    {
        $this->addFixture(UserFixtures::class);
        $this->executeFixtures();

        $client = static::createClient([], [
            'PHP_AUTH_USER' => 'user@example.com',
            'PHP_AUTH_PW'   => 'pass_1234',
        ]);

        $client->request('GET', '/');

        $this->assertEquals(200, $client->getResponse()->getStatusCode());

        $expectedNeedles = [
            '<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.2.0/antd.min.css" />',
            '<script src="/build/app'
        ];
        foreach ($expectedNeedles as $needle) {
            $this->assertContains($needle, $client->getResponse()->getContent());
        }
    }
}