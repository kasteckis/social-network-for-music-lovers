<?php

namespace App\Controller\Admin;

use App\Entity\Event;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class EventCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Event::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('title'),
            TextField::new('text'),
            BooleanField::new('active'),
            DateTimeField::new('startDateTime'),
            DateTimeField::new('endDateTime'),
            TextField::new('address'),
            BooleanField::new('remoteEvent'),
            ImageField::new('image')
                ->setBasePath('images/events')
                ->setUploadDir('public/images/events'),
            DateTimeField::new('createdAt')
        ];
    }
}
