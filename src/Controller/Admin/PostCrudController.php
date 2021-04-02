<?php

namespace App\Controller\Admin;

use App\Entity\Post;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\UrlField;

class PostCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Post::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            ImageField::new('image')
                ->setBasePath('images/posts')
                ->setUploadDir('public/images/posts'),
            TextField::new('title'),
            TextField::new('text'),
            UrlField::new('spotifyIframeUrl'),
            DateTimeField::new('createdAt'),
            DateTimeField::new('modifiedAt'),
            AssociationField::new('createdBy'),
            BooleanField::new('isThisPostNews')
        ];
    }
}
