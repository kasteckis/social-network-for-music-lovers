<?php

namespace App\Controller\Admin;

use App\Entity\Album;
use App\Entity\ChatMessage;
use App\Entity\DaySong;
use App\Entity\Event;
use App\Entity\Performer;
use App\Entity\Post;
use App\Entity\PostComment;
use App\Entity\Song;
use App\Entity\Survey;
use App\Entity\SurveyAnswer;
use App\Entity\TOP40;
use App\Entity\TOP40Live;
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
        yield MenuItem::section('Users');
        yield MenuItem::linkToCrud('Users', 'fa fa-user', User::class);
        yield MenuItem::section('Content');
        yield MenuItem::linkToCrud('Posts / News', 'fa fa-file-text-o', Post::class);
        yield MenuItem::linkToCrud('Comments', 'fa fa-comments', PostComment::class);
        yield MenuItem::linkToCrud('Chat messages', 'fa fa-commenting-o', ChatMessage::class);
        yield MenuItem::section('Frontpage right content');
        yield MenuItem::linkToCrud('Day Songs', 'fa fa-music', DaySong::class);
        yield MenuItem::linkToCrud('Surveys', 'fa fa-question', Survey::class);
        yield MenuItem::linkToCrud('Survey Answers', 'fa fa-question', SurveyAnswer::class);
        yield MenuItem::section('Songs, performers and albums');
        yield MenuItem::linkToCrud('Songs', 'fa fa-music', Song::class);
        yield MenuItem::linkToCrud('Performers (Groups)', 'fa fa-music', Performer::class);
        yield MenuItem::linkToCrud('Albums', 'fa fa-music', Album::class);
        yield MenuItem::section('TOPs');
        yield MenuItem::linkToCrud('TOP40', 'fa fa-trophy', TOP40::class);
        yield MenuItem::linkToCrud('TOP40 Live (sugeneruota sistemos)', 'fa fa-trophy', TOP40Live::class);
        yield MenuItem::section('Other');
        yield MenuItem::linkToCrud('Events', 'fa fa-calendar', Event::class);
    }
}
