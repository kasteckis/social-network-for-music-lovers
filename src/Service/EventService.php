<?php


namespace App\Service;


use App\Entity\Event;

class EventService
{
    /**
     * @param Event[] $events
     * @return array
     */
    public function convertEventArrayToJsonArray(array $events): array
    {
        $eventArray = [];

        foreach ($events as $event) {
            $eventArray[] = $this->convertEventEntityToArray($event);
        }

        return $eventArray;
    }

    public function convertEventEntityToArray(Event $event): array
    {
        return [
            'id' => $event->getId(),
            'title' => $event->getTitle(),
            'text' => $event->getText(),
            'active' => $event->getActive(),
            'startDateTime' => $event->getStartDateTime()->format('Y-m-d H:i:s'),
            'endDateTime' => $event->getEndDateTime() ? $event->getEndDateTime()->format('Y-m-d H:i:s') : null,
            'address' => $event->getAddress(),
            'remoteEvent' => $event->getRemoteEvent(),
            'image' => $event->getImage(),
            'createdAt' => $event->getCreatedAt()->format('Y-m-d H:i:s')
        ];
    }
}
