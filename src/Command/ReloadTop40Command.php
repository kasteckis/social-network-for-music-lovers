<?php

namespace App\Command;

use App\Service\TopService;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class ReloadTop40Command extends Command
{
    protected static $defaultName = 'app:reload-top40';
    protected static $defaultDescription = 'Reload TOP40. This command is made to be called once a week';

    private TopService $topService;

    public function __construct(TopService $topService, $name = null)
    {
        parent::__construct($name);
        $this->topService = $topService;
    }

    protected function configure()
    {
        $this
            ->setDescription(self::$defaultDescription)
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $this->topService->reloadTop40();

        $io->success('TOP40 Was refreshed!');

        return Command::SUCCESS;
    }
}
