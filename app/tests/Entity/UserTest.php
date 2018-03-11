<?php

namespace App\Tests\Entity;


use App\Entity\User;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserTest extends TestCase
{
    public function testCreateUser()
    {
        $encoder = $this->createMock(UserPasswordEncoderInterface::class);

        $encoder->expects($this->any())
            ->method('encodePassword')
            ->will($this->returnCallback(
                function ($user, $password) {
                    return md5($password);
                }
            ));

        $user = User::createUser(
            $encoder,
            'email@example.com',
            'pass_1234'
        );

        $this->assertEquals('220736aedcb18d7aa947a3a6a16e3fa9', $user->getPassword());
    }
}