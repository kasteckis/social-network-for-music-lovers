<?php

namespace App\Controller;

use App\Entity\ChatMessage;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ChatMessageController extends AbstractController
{
    /**
     * @Route("/api/chat-messages", name="chat_message")
     */
    public function getChatMessages(): Response
    {
        $chatMessages = $this->getDoctrine()->getRepository(ChatMessage::class)->findBy([], [
            'createdAt' => 'DESC'
        ], 10);

        $chatMessagesArray = [];

        // TODO: pafixint timezone
        foreach ($chatMessages as $chatMessage) {
            $chatMessagesArray[] = [
                'id' => $chatMessage->getId(),
                'username' => $chatMessage->getUser()->getName(),
                'message' => $chatMessage->getMessage(),
                'date' => $chatMessage->getCreatedAt()->format('Y-m-d H:i:s')
            ];
        }

        return $this->json($chatMessagesArray);
    }
}
