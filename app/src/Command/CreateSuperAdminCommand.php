<?php

namespace App\Command;


use App\Service\UserManager;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class CreateSuperAdminCommand extends Command
{
    private const ERROR_MESSAGE = '<error>%s</error>';

    private $userManager;

    public function __construct(
        ?string $name = null,
        UserManager $userManager
    )
    {
        parent::__construct($name);

        $this->userManager = $userManager;
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

        try {
            $this->userManager->create($email, $password);

            $output->writeln('User created!');
        } catch (\Exception $e) {
            $output->writeln(sprintf(self::ERROR_MESSAGE, $e->getMessage()));
        }
    }
}