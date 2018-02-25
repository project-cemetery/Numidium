<?php

namespace App\Controller;


use Symfony\Component\HttpFoundation\Response;

class HelloController
{
    public function say()
    {
        return new Response('Hello!');
    }
}