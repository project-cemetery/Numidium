<?php

namespace App\Command;


use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class CreateSuperAdminCommand extends Command
{
    private $encoder;
    private $em;

    public function __construct(
        ?string $name = null,
        UserPasswordEncoderInterface $encoder,
        EntityManagerInterface $em
    )
    {
        parent::__construct($name);

        $this->encoder = $encoder;
        $this->em = $em;
    }

    protected function configure()
    {
        $this
            ->setName('app:create-admin')
            ->addArgument('email', InputArgument::REQUIRED)
            ->addArgument('password', InputArgument::REQUIRED);
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $email = $input->getArgument('email');
        $password = $input->getArgument('password');

        $user = User::createUser($this->encoder, $email, $password);

        $this->em->persist($user);
        $this->em->flush();

        $output->writeln('User created!');
    }
}