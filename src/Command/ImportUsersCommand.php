<?php

namespace App\Command;

use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class ImportUsersCommand extends Command
{
    protected static $defaultName = 'app:import-users';
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

        $file = fopen('/var/www/html/m_users.csv', 'r');
        $a = 0;
        while (($line = fgetcsv($file)) !== FALSE) {
            try {
                $username = $line[1];
                $email = $line[6];
                $registrationIp = $line[61];
                $ip = $line[61];
                $createdAt = strtotime($line[20]) ? new \DateTime($line[20]) : new \DateTime('0000-00:00');
                $bio = $line[40];
                $lastLogin = strtotime($line[21]) ? new \DateTime($line[21]) : new \DateTime('0000-00:00');

                $newUser = new User();

                $newUser
                    ->setName($username)
                    ->setEmail($email)
                    ->setRegistrationIp($registrationIp)
                    ->setIp($ip)
                    ->setCreatedAt($createdAt)
                    ->setBio($bio)
                    ->setLastLogin($lastLogin)
                    ->setPassword('not set')
                ;

                $em->persist($newUser);
                $em->flush();
                $a++;
                if ($a > 1000) {
                    $a = 0;
                    $em->clear();
                }
            } catch (\Exception $exception) {
                $this->registry->resetManager();
            }
        }

        fclose($file);

        return Command::SUCCESS;
    }
}
