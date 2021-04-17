<?php

namespace App\Controller\Admin;

use App\Entity\TOP40;
use App\Repository\SongRepository;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;

class TOP40CrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return TOP40::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            BooleanField::new('new')
                ->setFormTypeOption('disabled',true),
            IntegerField::new('weeksInTop')
                ->setFormTypeOption('disabled',true),
            AssociationField::new('song')
                ->setFormTypeOptions(
                    [
                        'query_builder' => function (SongRepository $songRepository) {
                            return $songRepository->createQueryBuilder('song')
                                ->leftJoin('song.top40', 'top40')
                                ->andWhere('top40.song is null');
                        },
                    ]
                ),
            IntegerField::new('likes')
                ->setFormTypeOption('disabled',true),
            IntegerField::new('lastWeekPlace')
                ->setFormTypeOption('disabled',true),
            IntegerField::new('place')
                ->setFormTypeOption('disabled',true),
            BooleanField::new('active')
                ->setFormTypeOption('disabled',true),
            BooleanField::new('displayPlaceChange')
                ->setFormTypeOption('disabled',true)
        ];
    }
}
