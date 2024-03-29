<?php

namespace App\Controller\Admin;

use App\Entity\DaySong;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\UrlField;

class DaySongCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return DaySong::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('title'),
            UrlField::new('spotifyLink'),
            DateField::new('date'),
        ];
    }
}
