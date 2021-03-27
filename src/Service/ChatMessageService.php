<?php


namespace App\Service;


use App\Entity\ChatMessage;
use Doctrine\ORM\EntityManagerInterface;

class ChatMessageService
{
    private EntityManagerInterface $entityManager;

    /**
     * ChatMessageService constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function chatMessageEntityToArray(ChatMessage $chatMessage): array
    {
        return [
            'id' => $chatMessage->getId(),
            'username' => $chatMessage->getUser()->getName(),
            'message' => $chatMessage->getMessage(),
            'date' => $chatMessage->getCreatedAt()->format('Y-m-d H:i:s')
        ];
    }

    public function getLastMessagesByCount(int $count): array
    {
        $chatMessages = $this->entityManager->getRepository(ChatMessage::class)->findBy([], [
            'createdAt' => 'DESC'
        ], $count);

        $chatMessagesArray = [];

        // TODO: pafixint timezone
        foreach ($chatMessages as $chatMessage) {
            $chatMessagesArray[] = $this->chatMessageEntityToArray($chatMessage);
        }

        return $chatMessagesArray;
    }
}
