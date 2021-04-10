<?php

namespace App\Controller\Admin;

use App\Entity\Performer;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class PerformerCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Performer::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('title'),
            ImageField::new('image')
                ->setBasePath('images/groups')
                ->setUploadDir('public/images/groups'),
            AssociationField::new('songs'),
            AssociationField::new('albums'),
            TextField::new('bio'),
            TextField::new('country'),
            TextField::new('startedCareer'),
            TextField::new('style')
        ];
    }
}
