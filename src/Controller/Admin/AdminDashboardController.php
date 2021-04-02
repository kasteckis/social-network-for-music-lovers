<?php

namespace App\Controller\Admin;

use App\Entity\ChatMessage;
use App\Entity\DaySong;
use App\Entity\Event;
use App\Entity\Post;
use App\Entity\Survey;
use App\Entity\SurveyAnswer;
use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AdminDashboardController extends AbstractDashboardController
{
    /**
     * @IsGranted("ROLE_ADMIN")
     * @Route("/admin", name="admin")
     */
    public function index(): Response
    {
        return $this->render('easyadminbundle/dashboard.html.twig');
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Music.lt admin valdymo skydas')
            ;
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linktoDashboard('Dashboard', 'fa fa-home');
        yield MenuItem::linkToCrud('Users', 'fas fa-list', User::class);
        yield MenuItem::linkToCrud('Chat messages', 'fas fa-list', ChatMessage::class);
        yield MenuItem::linkToCrud('Day Songs', 'fas fa-list', DaySong::class);
        yield MenuItem::linkToCrud('Posts / News', 'fas fa-list', Post::class);
        yield MenuItem::linkToCrud('Surveys', 'fas fa-list', Survey::class);
        yield MenuItem::linkToCrud('Survey Answers', 'fas fa-list', SurveyAnswer::class);
        yield MenuItem::linkToCrud('Events', 'fas fa-list', Event::class);
    }
}
