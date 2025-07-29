from collections import defaultdict

from django.core.exceptions import ValidationError
from django.forms.utils import ErrorList
from wagtail import blocks
from wagtail.blocks.struct_block import StructBlockValidationError
from wagtail.documents.blocks import DocumentChooserBlock
from wagtail.images.blocks import ImageBlock, ImageChooserBlock
from wagtail.snippets.blocks import SnippetChooserBlock

from utils.struct_values import CardStructValue, LinkStructValue



class InternalLinkBlock(blocks.StructBlock):
    page = blocks.PageChooserBlock()
    title = blocks.CharBlock(
        required=False,
        help_text="Leave blank to use page's listing title.",
    )

    class Meta:
        icon = "link"
        value_class = LinkStructValue

class ExternalLinkBlock(blocks.StructBlock):
    link = blocks.URLBlock()
    title = blocks.CharBlock()

    class Meta:
        icon = "link"
        value_class = LinkStructValue


class LinkStreamBlock(blocks.StreamBlock):
    """
    StreamBlock that allows editors to add a single link of type internal or external.
    """

    internal = InternalLinkBlock()
    external = ExternalLinkBlock()

    class Meta:
        icon = "link"
        label = "Link"
        min_num = 1
        max_num = 1
