<?php

namespace App\Controller\Admin;

use App\Entity\SurveyAnswer;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class SurveyAnswerCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return SurveyAnswer::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('title'),
            IntegerField::new('position'),
            AssociationField::new('survey')
        ];
    }
}
