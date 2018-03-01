<?php

namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class MeController extends Controller
{
    public function getId(): Response
    {
        $user = $this->getUser();

        if (!$user) {
            throw $this->createNotFoundException();
        }

        return new JsonResponse($user->getId());
    }
}