import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Link,
  List,
  ListItem,
} from "@chakra-ui/react";
import React, { FunctionComponent, Fragment } from "react";

export const SideBar: FunctionComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Fragment>
      <Button
        href={btnRef}
        colorScheme="teal"
        placement="right"
        onClick={onOpen}
      >
        Explore
      </Button>

      <List>
        <ListItem>
          <Link href="/en/domain-category/behavior">Behavior</Link>
        </ListItem>
        <ListItem>
          <Link href="/en/domain-category/cognition">Cognition</Link>
        </ListItem>
        <List>
          <ListItem ml="4">
            <Link href="/en/domain-category/cognition/domain/attention">
              Attention
            </Link>
          </ListItem>
          <ListItem ml="4">
            <Link href="/en/domain-category/cognition/domain/planning_and_organization">
              Planning and organization
            </Link>
          </ListItem>
          <ListItem ml="4">
            <Link href="/en/domain-category/cognition/domain/memory">
              Memory
            </Link>
          </ListItem>
          <ListItem ml="4">
            <Link href="/en/domain-category/cognition/domain/abstract_learning">
              Abstract learning
            </Link>
          </ListItem>
          <ListItem ml="4">
            <Link href="/en/domain-category/cognition/domain/thinking_speed">
              {` `}
              Thinking speed
            </Link>
          </ListItem>
        </List>
        <ListItem>
          <Link href="/en/domain-category/emotion">Emotions</Link>
        </ListItem>
        <ListItem>
          <Link href="/en/domain-category/health">Health</Link>
        </ListItem>
        <ListItem>
          <Link href="/en/domain-category/language">Language</Link>
        </ListItem>
        <ListItem>
          <Link href="/en/domain-category/learning">Learning</Link>
        </ListItem>
        <ListItem>
          <Link href="/en/domain-category/personal_and_personality">
            Personal and personality
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/en/domain-category/social_function">
            Social function
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/en/domain-category/cognition/domain/attention/guide/cognition_attention_educating">
            Guide // cognition
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/en/domain-category/cognition/domain/attention">
            domain // cognition
          </Link>
        </ListItem>
      </List>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Explore</DrawerHeader>

          <DrawerBody>
            <List>
              <ListItem>
                <Link href="/en/domain-category/behavior">Behavior</Link>
              </ListItem>
              <ListItem>
                <Link href="/en/domain-category/cognition">Cognition</Link>
              </ListItem>
              <List>
                <ListItem ml="4">
                  <Link href="/en/domain-category/cognition/domain/attention">
                    Attention
                  </Link>
                </ListItem>
                <ListItem ml="4">
                  <Link href="/en/domain-category/cognition/domain/planning_and_organization">
                    Planning and organization
                  </Link>
                </ListItem>
                <ListItem ml="4">
                  <Link href="/en/domain-category/cognition/domain/memory">
                    Memory
                  </Link>
                </ListItem>
                <ListItem ml="4">
                  <Link href="/en/domain-category/cognition/domain/abstract_learning">
                    Abstract learning
                  </Link>
                </ListItem>
                <ListItem ml="4">
                  <Link href="/en/domain-category/cognition/domain/attention">
                    Thinking speed
                  </Link>
                </ListItem>
              </List>
              <ListItem>
                <Link href="/en/domain-category/emotion">Emotions</Link>
              </ListItem>
              <ListItem>
                <Link href="/en/domain-category/health">Health</Link>
              </ListItem>
              <ListItem>
                <Link href="/en/domain-category/language">Language</Link>
              </ListItem>
              <ListItem>
                <Link href="/en/domain-category/learning">Learning</Link>
              </ListItem>
              <ListItem>
                <Link href="/en/domain-category/personal_and_personality">
                  Personal and personality
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/en/domain-category/social_function">
                  Social function
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/en/domain-category/cognition/domain/attention/guide/cognition_attention_educating">
                  Guide // cognition
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/en/domain-category/cognition/domain/attention">
                  domain // cognition
                </Link>
              </ListItem>
            </List>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
};
