<?php

namespace App\Command;

use App\Entity\Post;
use App\Entity\User;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class ImportPostsCommand extends Command
{
    protected static $defaultName = 'app:import-posts';
    protected static $defaultDescription = 'Add a short description for your command';

    private ManagerRegistry $registry;

    /**
     * ImportUsersCommand constructor.
     */
    public function __construct(ManagerRegistry $registry, $name = null)
    {
        parent::__construct($name);
        $this->registry = $registry;
    }

    protected function configure(): void
    {
        $this
            ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
            ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        ini_set('memory_limit', '-1');
        set_time_limit(0);
        $em = $this->registry->getManager();
        $userRepo = $em->getRepository(User::class);
        $admin = $userRepo->findOneBy(['id' => 1]);

        $file = fopen('/var/www/html/m_news.csv', 'r');
        while (($line = fgetcsv($file)) !== FALSE) {
            try {
                if ($line[0] === 'ID') {
                    continue;
                }
                if ($line[0] === '') {
                    continue;
                }
                $title = $line[6];
                $text = $line[7];
                $photo = strlen($line[13]) > 0 ? $line[13] : null;
                $createdAt = new \DateTime($line[18]);

                $newPost = new Post();
                $newPost
                    ->setTitle($title)
                    ->setText($text)
                    ->setImage($photo)
                    ->setCreatedAt($createdAt)
                    ->setCreatedBy($admin)
                    ->setIsThisPostNews(true)
                ;

                $em->merge($newPost);
                $em->flush();
            } catch (\Exception $exception) {
                if ($exception instanceof UniqueConstraintViolationException) {

                } else {
                    $this->registry->resetManager();
                    echo 'reset manager';
                }
            }
        }

        fclose($file);

        return Command::SUCCESS;
    }
}
